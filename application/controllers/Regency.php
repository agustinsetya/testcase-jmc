<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Regency extends CI_Controller {

	function __construct()
	{
		parent::__construct();
		$this->load->model('RegencyModel');
	}

	public function getAllRegency($payload = null)
	{
		$data['province']=$this->RegencyModel->getAllProvince();
		$data['regency']=$this->RegencyModel->getAllRegency($payload);
		
		$this->load->view('regency-list', $data);
	}

	public function getFilteredRegency()
	{
		$payload = array(
			'province' => $this->input->post('province'),
			'keyword' => $this->input->post('keyword')
		);

		$this->getAllRegency($payload);
	}

	function addRegency()
	{
		$data = array(
			'mt_regency_name' => $this->input->post('regency_name'),
			'total_population' => $this->input->post('total_population'),
			'mt_province_id' => $this->input->post('province_id')
		);

		$this->RegencyModel->addRegencyData($data);
		redirect('Regency/getAllRegency');
	}

	function updateRegency()
	{
		$data = array(
			'mt_regency_id' => $this->input->post('regency_id'),
			'mt_regency_name' => $this->input->post('regency_name'),
			'total_population' => $this->input->post('total_population'),
			'mt_province_id' => $this->input->post('province_id')
		);

		$this->RegencyModel->updateRegencyData($data);
		redirect('Regency/getAllRegency');
	}

	function deleteRegency($id)
	{
		$this->RegencyModel->deleteData($id);
		redirect('Regency/getAllRegency');
	}
}
