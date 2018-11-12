<?php
class ControllerExtensionModuleNewsbanner extends Controller {
	public function index($setting) {
		static $modul = 0;
		
		$this->document->addStyle('catalog/view/javascript/jquery/owl-carousel/owl.carousel.css');
		$this->document->addScript('catalog/view/javascript/jquery/owl-carousel/owl.carousel.min.js');
		
		$data['modules_news'] = array();

		$this->load->model('extension/module/newsbanner');
		$this->load->model('tool/image');
		
		$modules = $this->model_extension_module_newsbanner->getNewsbanner();
		
		$data['modules_news'] = array();

		If ($modules) {
			foreach ($modules as $mod) {
				if (empty($mod['news_on'])) {$mod['news_on'] = 0;}
				if (empty($mod['news_sort'])) {$mod['news_sort'] = 0;}
				
				if (!empty($mod['news_h1'])) {$decod_name = json_decode($mod['news_h1'], true); $name = utf8_substr(strip_tags(html_entity_decode($decod_name[$this->session->data['language']], ENT_QUOTES, 'UTF-8')), 0, $limit_h1) . '..';} else {$name = false;}
				if (!empty($mod['news_text'])) {$decod_description = json_decode($mod['news_text'], true); $description = $decod_description[$this->session->data['language']];} else {$description = false;}
				
				$data['modules_news'][] = array(
					'news_h1' 			=> $name,
					'news_image' 		=> $mod['news_image'],
					'news_sort' 		=> $mod['news_sort'],
					'news_on' 			=> $mod['news_on'],
					'news_id' 			=> $mod['news_id'],
					'information_id' 	=> $mod['information_id'],
					'news_text' 		=> html_entity_decode($description, ENT_QUOTES, 'UTF-8')			
				);
			}
		}
		
		$data['modul'] = $modul++;

		return $this->load->view('extension/module/newsbanner', $data);
	}
}