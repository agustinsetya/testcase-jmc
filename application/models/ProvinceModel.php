<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class ProvinceModel extends CI_Model {

	public function getAllProvince()
    {
		$this->db
			->select([
				'mt_province_id province_id',
				'mt_province_name province_name'
			])
			->from('mt_province')
		;

		$query = $this->db->get();

        if ($query->num_rows()) {
            $data = $query->result();
        }

        return (array) ($data ?? []);
	}

	public function updateProvinceData($data)
    {
        return $this->db
			->where('mt_province_id', $data['mt_province_id'])
			->update('mt_province', $data)
		;
    }

	public function deleteData($id)
    {
        return $this->db
			->where('mt_province_id', $id)
			->delete('mt_province')
		;
    }
}