<?php
class ModelExtensionModuleNewsbanner extends Model {
	
	public function getNewsbanner() {
		
		$res0 = $this->db->query("SHOW TABLES LIKE '". DB_PREFIX ."newsbanner'");
		if($res0->num_rows != 0){
			
			$query = $this->db->query("SELECT * FROM ". DB_PREFIX ."newsbanner ORDER BY news_sort ASC");

			return $query->rows;
			
		}
	}
	
}