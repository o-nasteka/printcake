<?php
class ControllerExtensionModuleColortemplate extends Controller {
	public function index() {
		$status_user_admin = true;
		if ($status_user_admin) {
			if ($this->config->get('module_mastercolor_colorone')) {$data['module_mastercolor_colorone'] = $this->config->get('module_mastercolor_colorone');} else {$data['module_mastercolor_colorone'] = '#2c941d';}
			if ($this->config->get('module_mastercolor_colordou')) {$data['module_mastercolor_colordou'] = $this->config->get('module_mastercolor_colordou');} else {$data['module_mastercolor_colordou'] = '#ffffff';}
			if ($this->config->get('module_mastercolor_colorfri')) {$data['module_mastercolor_colorfri'] = $this->config->get('module_mastercolor_colorfri');} else {$data['module_mastercolor_colorfri'] = '#ff8c00';}
		} else {
			if (isset($this->request->cookie['module_mastercolor_colorone'])) {$data['module_mastercolor_colorone'] = $this->request->cookie['module_mastercolor_colorone'];} else {$data['module_mastercolor_colorone'] = '#2c941d';}
			if (isset($this->request->cookie['module_mastercolor_colordou'])) {$data['module_mastercolor_colordou'] = $this->request->cookie['module_mastercolor_colordou'];} else {$data['module_mastercolor_colordou'] = '#ffffff';}
			if (isset($this->request->cookie['module_mastercolor_colorfri'])) {$data['module_mastercolor_colorfri'] = $this->request->cookie['module_mastercolor_colorfri'];} else {$data['module_mastercolor_colorfri'] = '#ff8c00';}
		}
			
		return $this->load->view('extension/module/colortemplate', $data);
	}
}