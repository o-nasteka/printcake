<?php
class ControllerExtensionModuleTemplatemaps extends Controller {
	public function index($setting) {
		$data = array();
		
		$data['config_geocode'] = $this->config->get('config_geocode');
		
		$data['entry_coord_key'] = $this->config->get('templatemaps_coord');
		
		if ($this->config->get('module_templatemaps_status')) {
			return $this->load->view('extension/module/templatemaps', $data);
		}
	}
}