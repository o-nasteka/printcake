<?php
class ControllerExtensionModuleCallbacking extends Controller {
	public function index() {

			$this->load->language('extension/module/callbacking');
			$this->load->language('extension/module/langtemplates');
			
			$this->load->model('catalog/product');
			$this->load->model('catalog/review');
			$this->load->model('tool/image');
			
			$this->load->model('extension/module/callbacking');
		
			$this->model_extension_module_callbacking->createcallbacking();
			
			if (isset($this->request->get['product_id'])) {
				$product_id = (int)$this->request->get['product_id'];
			} else {
				$product_id = 0;
			}

			$data['td_more'] = $this->language->get('td_more');
			$data['text_related'] = $this->language->get('text_related');
			$data['text_tax'] = $this->language->get('text_tax');
			$data['send'] = $this->language->get('send');
			$data['text_loading'] = $this->language->get('text_loading');
			$data['text_callback_product'] = $this->language->get('text_callback_product');
			$data['text_error_callbacking'] = $this->language->get('text_error_callbacking');
			
			$data['text_fio'] = $this->language->get('text_fio');
			$data['text_phone'] = $this->language->get('text_phone');
			$data['text_email'] = $this->language->get('text_email');
			$data['text_comment'] = $this->language->get('text_comment');
			$data['callbacking'] = $this->language->get('callbacking');
			$data['close'] = $this->language->get('close');

			$data['text_contacts'] = $this->language->get('text_contacts');
			
			if ($this->config->get('module_callbacking_status_your_name')) {$data['module_callbacking_status_your_name'] = $this->config->get('module_callbacking_status_your_name');} else {$data['module_callbacking_status_your_name'] = false;}
			if ($this->config->get('module_callbacking_status_phone')) {$data['module_callbacking_status_phone'] = $this->config->get('module_callbacking_status_phone');} else {$data['module_callbacking_status_phone'] = false;}
			if ($this->config->get('module_callbacking_status_email')) {$data['module_callbacking_status_email'] = $this->config->get('module_callbacking_status_email');} else {$data['module_callbacking_status_email'] = false;}
			if ($this->config->get('module_callbacking_status_comment')) {$data['module_callbacking_status_comment'] = $this->config->get('module_callbacking_status_comment');} else {$data['module_callbacking_status_comment'] = false;}
			if ($this->config->get('module_callbacking_format')) {$data['module_callbacking_format'] = $this->config->get('module_callbacking_format');} else {$data['module_callbacking_format'] = false;}
			
			if ($this->config->get('module_callbacking_text')) {
				$text = $this->config->get('module_callbacking_text');
				$data['module_callbacking_text'] = html_entity_decode($text[$this->session->data['language']], ENT_QUOTES, 'UTF-8');
			} else {
				$data['module_callbacking_text'] = false;
			}

			$data['date'] = date("d.m.Y");

			return $this->response->setOutput($this->load->view('extension/module/callbacking', $data));
			
	}
	public function quick() {
		$this->load->model('extension/module/callbacking');
		$this->load->language('extension/module/langtemplates');
		
		$json = array();
		
		if ($this->config->get('module_callbacking_status_your_name')) {if ((utf8_strlen($this->request->post['name']) < 1) || (utf8_strlen($this->request->post['name']) > 64)) {
			$json['error']['name'] = $this->language->get('error_name');
		}}
		if ($this->config->get('module_callbacking_status_phone')) {if ((utf8_strlen($this->request->post['phone']) < 1) || (utf8_strlen($this->request->post['phone']) > 32)) {
			$json['error']['phone'] = $this->language->get('error_phone');
		}}
		if ($this->config->get('module_callbacking_status_email')) {if ((utf8_strlen($this->request->post['email']) < 1) || (utf8_strlen($this->request->post['email']) > 32)) {
			$json['error']['email'] = $this->language->get('error_email');
		}}
		if ($this->config->get('module_callbacking_text')) {
			$text = $this->config->get('module_callbacking_text');
			$data['module_callbacking_text'] = html_entity_decode($text[$this->session->data['language']], ENT_QUOTES, 'UTF-8');
		} else {
			$data['module_callbacking_text'] = false;
		}
		if (!isset($this->request->post['zachita']) &&  ($this->config->get('module_callbacking_format') == "checkbox" && $data['module_callbacking_text'])) {
			$json['error']['zachita'] = $this->language->get('error_zachita');
		}
		
		if (!$this->config->get('module_callbacking_status_your_name') and !$this->config->get('module_callbacking_status_phone') and !$this->config->get('module_callbacking_status_email')) {
			$json['error'] = 'empty_setting';
			$json['empty'] = $this->language->get('error_empty_callback');
		}
		
		if (!isset($json['error'])) {
			$json['message'] = $this->model_extension_module_callbacking->writesendquick($this->request->post);
		}
		
		$this->response->addHeader('Content-Type: application/json');
		$this->response->setOutput(json_encode($json));
		
	}

}