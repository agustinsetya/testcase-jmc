<?php 
$no = 1;
foreach ($regency as $reg) 
{
?>
    <div class="modal" id="modal_edit_regency<?= $reg->regency_id;?>" tabindex="-1" role="dialog" aria-labelledby="largeModal" aria-hidden="true">
    <div class="modal-dialog">
        <form action="<?php echo site_url('Regency/updateRegency'); ?>" method="post">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Edit Kota/Kabupaten</h4>
            </div>
            <div class="modal-body">     
                <input type="hidden" readonly value="<?= $reg->regency_id;?>" name="regency_id" class="form-control">
                <div class="row">
                    <div class="form-group">
                        <label class="control-label col-xs-3" >Kota/Kabupaten</label>
                        <div class="col-xs-8">
                            <input name="regency_name" class="form-control" type="text" value="<?= $reg->regency_name;?>" required>
                        </div>
                    </div><br><br>
                    <div class="form-group">
                        <label class="control-label col-xs-3" >Provinsi</label>
                        <div class="col-xs-8">
                            <select class='form-control' id='exampleFormControlSelect2' name='province_id' required>
                                <option value="">-- Pilih Provinsi--</option>
                                <?php foreach ($province as $prov) {
                                echo '<option value="'.$prov->province_id.'" ';
                                if ($reg->province_id==$prov->province_id)
                                    echo "selected";
                                echo '>'.$prov->province_name.'</option>';
                                }?>
                            </select>
                        </div>
                    </div><br><br>
                    <div class="form-group">
                        <label class="control-label col-xs-3" >Jumlah Penduduk</label>
                        <div class="col-xs-8">
                            <input name="total_population" class="form-control" type="text" value="<?= $reg->total_population;?>" required>
                        </div>
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