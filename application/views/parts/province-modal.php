<?php 
$no = 1;
foreach ($province as $prov) 
{
?>
    <div class="modal" id="modal_edit<?= $prov->province_id;?>" tabindex="-1" role="dialog" aria-labelledby="largeModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form action="<?php echo site_url('Province/updateProvince'); ?>" method="post">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Edit Provinsi</h4>
                    </div>
                    <div class="modal-body">     
                        <input type="hidden" readonly value="<?= $prov->province_id;?>" name="province_id" class="form-control">
                        <div class="form-group">
                            <label class="control-label col-xs-3" >Nama Provinsi</label>
                            <div class="col-xs-8">
                                <input name="province_name" class="form-control" type="text" value="<?= $prov->province_name;?>" required>
                            </div>
                        </div><br>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-warning"><i class="icon-pencil5"></i> Edit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
<?php
$no++;
}
?>

<div class="modal" id="modal_add_province" tabindex="-1" role="dialog" aria-labelledby="largeModal" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form action="<?php echo site_url('Province/addProvince'); ?>" method="post">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Add Provinsi</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label class="control-label col-xs-3" >Nama Provinsi</label>
                        <div class="col-xs-8">
                            <input name="province_name" class="form-control" type="text" value="" required>
                        </div>
                    </div><br>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-warning"><i class="icon-pencil5"></i> Add</button>
                </div>
            </form>
        </div>
    </div>
</div>