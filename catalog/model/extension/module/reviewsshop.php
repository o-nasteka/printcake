<?php
class ModelExtensionModuleReviewsshop extends Model {
	
	public function getReviewsshop() {
		
		$res0 = $this->db->query("SHOW TABLES LIKE '". DB_PREFIX ."reviewsshop'");
		if($res0->num_rows != 0){
			
			$query = $this->db->query("SELECT * FROM ". DB_PREFIX ."reviewsshop ORDER BY news_sort ASC");

			return $query->rows;
			
		}
	}
	
}