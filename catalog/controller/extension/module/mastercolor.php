<?php
class ControllerExtensionModuleMastercolor extends Controller {
	public function index() {
		$this->load->language('extension/module/mastercolor');

		$data['heading_title'] = $this->language->get('heading_title_1');
		$data['text_color_save'] = $this->language->get('text_color_save');
		$data['text_color_success'] = $this->language->get('text_color_success');
		$data['text_color_error'] = $this->language->get('text_color_error');
		
		$data['color_massiv_one'] = array();
		$data['color_massiv_one'] = array(
			'1' => '#F44336',
			'2' => '#E91E63',
			'3' => '#9C27B0',
			'4' => '#673AB7',
			'5' => '#3F51B5',
			'6' => '#2196F3',
			'7' => '#03A9F4',
			'8' => '#00BCD4',
			'9' => '#2c941d',
			'10' => '#8BC34A',
			'11' => '#CDDC39',
			'12' => '#FFEB3B',
			'13' => '#FFC107',
			'14' => '#FF5722',
			'15' => '#795548',
			'16' => '#607D8B'
		);
		
		$data['color_massiv_dou'] = array();
		$data['color_massiv_dou'] = array(
			'1' => '#000000',
			'2' => '#3F3F3F',
			'3' => '#595959',
			'4' => '#7F7F7F',
			'5' => '#A5A5A5',
			'6' => '#BFBFBF',
			'7' => '#D8D8D8',
			'8' => '#F2F2F2',
			'9' => '#FFFFFF',
		);
		
		$data['color_massiv_fri'] = array();
		$data['color_massiv_fri'] = array(
			'1' => '#607D8B',
			'2' => '#795548',
			'3' => '#FF5722',
			'4' => '#ff8c00',
			'5' => '#FFC107',
			'6' => '#FFEB3B',
			'7' => '#8BC34A',
			'8' => '#2c941d',
			'9' => '#00BCD4',
			'10' => '#03A9F4',
			'11' => '#2196F3',
			'12' => '#CDDC39',
			'13' => '#3F51B5',
			'14' => '#673AB7',
			'15' => '#9C27B0',
			'16' => '#E91E63',
			'17' => '#F44336'
		);
		$data['colorread'] = false;
		if ($this->config->get('module_mastercolor_colorone')) {$data['module_mastercolor_colorone'] = $this->config->get('module_mastercolor_colorone');} else {$data['module_mastercolor_colorone'] = '#2c941d';}
		if ($this->config->get('module_mastercolor_colordou')) {$data['module_mastercolor_colordou'] = $this->config->get('module_mastercolor_colordou');} else {$data['module_mastercolor_colordou'] = '#ffffff';}
		if ($this->config->get('module_mastercolor_colorfri')) {$data['module_mastercolor_colorfri'] = $this->config->get('module_mastercolor_colorfri');} else {$data['module_mastercolor_colorfri'] = '#ff8c00';}
		$data['module_mastercolor_status'] = $this->config->get('module_mastercolor_status');
		
		$this->user = new Cart\User($this->registry);
		
		$status_user_admin = true;
		
		if ($this->config->get('module_mastercolor_status')) {
			if ($this->user->isLogged() or !$status_user_admin) {
				return $this->load->view('extension/module/mastercolor', $data);
			}
		}
		
	}
	public function colorwrite() {
		$status_user_admin = true;
		if ($status_user_admin) {
			$this->load->model('setting/mastersetting');
			if ($this->request->server['REQUEST_METHOD'] == 'POST') {
				$this->model_setting_mastersetting->editSetting('module_mastercolor', $this->request->post);
			}
		} else {
			setcookie('module_mastercolor_colorone', $this->request->post['module_mastercolor_colorone'], time() + 3600, '/', $this->request->server['HTTP_HOST']);
			setcookie('module_mastercolor_colordou', $this->request->post['module_mastercolor_colordou'], time() + 3600, '/', $this->request->server['HTTP_HOST']);
			setcookie('module_mastercolor_colorfri', $this->request->post['module_mastercolor_colorfri'], time() + 3600, '/', $this->request->server['HTTP_HOST']);
		}
			
	}
}