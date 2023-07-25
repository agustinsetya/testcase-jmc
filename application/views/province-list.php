<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Test Case JMC</title>

	<style>
		<script type="text/javascript" src="<?php echo base_url();?>public/assets/stylesheets/base-layout.css"></script>
	</style>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">

</head>
<body>
	<section class="panel">
		<div class="panel-body">
			<div class="x_title">
				<u><h2>Province List</h2></u>
			</div>

			<a href="<?= base_url();?>Regency/getAllRegency" class="btn btn-success" >Regency Data</a>
			<a class="btn btn-warning btn-add-province" data-toggle="modal" data-target="#modal_add_province">Add Province</a><br><br>

			<div class="table-responsive">
				<table class="table province_list" border="1">
					<thead>
						<th>No.</th>
						<th>Nama Provinsi</th>
						<th>Action</th>
					</thead>
					<tbody>
						<?php 
						$i=1;
						foreach ($province as $prov) 
						{
						?>
							<tr>
								<td><?php echo $i; ?></td>
								<td><?php echo $prov->province_name;?></td>
								<td>
									<a class="btn btn-sm btn-warning" data-toggle="modal" data-target="#modal_edit<?= $prov->province_id;?>"><span class="glyphicon glyphicon-edit"></span></a>
									<a href="<?= base_url() ?>Province/deleteProvince/<?= $prov->province_id?>" class="btn btn-danger" onclick="return confirm('Apakah Anda Ingin Menghapus Data : <?=$prov->province_name;?> ?');"><span class="glyphicon glyphicon-trash"></span></a>
								</td>
							</tr>
						<?php
						$i++;
						}
						?>
					</tbody>
				</table>
			</div>
		</div>
	</section>

	<?php $this->load->view('parts/province-modal'); ?>

</body>
</html>
