<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class RegencyModel extends CI_Model {

	public function getAllProvince()
    {
		$this->db
			->select([
				'province.mt_province_id province_id',
				'province.mt_province_name province_name'
			])
			->from('mt_province province')
		;

		$query = $this->db->get();

        if ($query->num_rows()) {
            $data = $query->result();
        }

        return (array) ($data ?? []);
	}
	
	public function getAllRegency($payload)
    {
		$select = [
            'reg.mt_regency_id regency_id',
            'reg.mt_regency_name regency_name',
            'reg.total_population',
            'prov.mt_province_id province_id',
            'prov.mt_province_name province_name'
        ];

        $this->db->start_cache()
        ->from('mt_regency reg')
        ->join('mt_province prov', 'reg.mt_province_id = prov.mt_province_id', 'left')
        ;

        $this->setAdditionalConditionForFilter($payload);

        $this->db->stop_cache();

		$query = $this->db->select($select)->get();

        if ($query->num_rows()) {
            $data = $query->result();
        }

        return (array) ($data ?? []);
	}

    public function addRegencyData($data)
    {
        return $this->db
			->insert('mt_regency', $data)
		;
    }

	public function updateRegencyData($data)
    {
        return $this->db
			->where('mt_regency_id', $data['mt_regency_id'])
			->update('mt_regency', $data)
		;
    }

	public function deleteData($id)
    {
        return $this->db
			->where('mt_regency_id', $id)
			->delete('mt_regency')
		;
    }

	private function setAdditionalConditionForFilter($payload)
    {
        if (isset($payload['keyword']) && !empty($payload['keyword'])) {
            $this->db->group_start();
            $this->db->or_where('reg.mt_regency_name RLIKE', $payload['keyword']);
            $this->db->or_where('prov.mt_province_name RLIKE', $payload['keyword']);
            $this->db->group_end();
        }

		if (!empty($payload['province'])) {
            $this->db->where_in('prov.mt_province_id', $payload['province']);
        }
	}
}