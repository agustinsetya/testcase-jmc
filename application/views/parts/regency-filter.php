<form action="<?php echo site_url('Regency/getFilteredRegency'); ?>" method="post">
    <div class="form-group">
        <div class="row">
            <div class="col-sm-5">
                <input name="keyword" class="form-control" type="text" value="">
            </div>

            <div class="col-sm-5">
                <select class='form-control' id='exampleFormControlSelect2' name='province'>
                    <option value="">-- Pilih Provinsi--</option>
                    <?php foreach ($province as $prov) {
                    echo '<option value="'.$prov->province_id.'">'.$prov->province_name.'</option>';
                    }?>
                </select>
            </div>

            <div class="col-sm-2">
                <button class="btn btn-warning" type="submit">Search</button>
            </div>
        </div>
    </div><br>
</form>