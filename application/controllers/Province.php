<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Province extends CI_Controller {

	function __construct()
	{
		parent::__construct();
		$this->load->model('ProvinceModel');
	}

	public function index()
	{
		$data['province']=$this->ProvinceModel->getAllProvince();
		$this->load->view('province-list', $data);
	}

	function addProvince()
	{
		$data = array(
			'mt_province_name' => $this->input->post('province_name')
		);

		$this->ProvinceModel->addProvinceData($data);
		redirect('Province');
	}

	function updateProvince()
	{
		$data = array(
			'mt_province_id' => $this->input->post('province_id'),
			'mt_province_name' => $this->input->post('province_name')
		);

		$this->ProvinceModel->updateProvinceData($data);
		redirect('Province');
	}

	function deleteProvince($id)
	{
		$this->ProvinceModel->deleteData($id);
		redirect('Province');
	}
}
