<?php
class ControllerExtensionModuleMastermodule extends Controller {
	public function index($setting) {
		$this->load->language('extension/module/mastermodule');

		$data['heading_title'] = $this->language->get('heading_title');

		$data['text_tax'] = $this->language->get('text_tax');

		$data['button_cart'] = $this->language->get('button_cart');
		$data['button_wishlist'] = $this->language->get('button_wishlist');
		$data['button_compare'] = $this->language->get('button_compare');

		$this->load->model('catalog/product');
		
		$this->load->language('extension/module/langtemplates');
		$data['button_quickpay'] = $this->language->get('button_quickpay');
		$data['setting'] = $setting;
		
		$data['mastermodule_featured'] = $this->language->get('mastermodule_featured');
		$data['mastermodule_bestseller'] = $this->language->get('mastermodule_bestseller');
		$data['mastermodule_special'] = $this->language->get('mastermodule_special');
		$data['mastermodule_latest'] = $this->language->get('mastermodule_latest');

		$this->load->model('tool/image');

		$data['products_featured'] = array();
		$data['products_bestseller'] = array();
		$data['products_special'] = array();
		$data['products_latest'] = array();

		if (!$setting['limit']) {
			$setting['limit'] = 4;
		}
		
		$data['status_block'] = array();
		
		if (!isset($setting['featured_status'])) {$data['featured_status'] = false;} else {$data['featured_status'] = true; $data['status_block'][] = 'featured_status';}
		if (!isset($setting['bestseller_status'])) {$data['bestseller_status'] = false;} else {$data['bestseller_status'] = true; $data['status_block'][] = 'bestseller_status';}
		if (!isset($setting['special_status'])) {$data['special_status'] = false;} else {$data['special_status'] = true; $data['status_block'][] = 'special_status';}
		if (!isset($setting['latest_status'])) {$data['latest_status'] = false;} else {$data['latest_status'] = true; $data['status_block'][] = 'latest_status';}
		
		if ($data['status_block']) {
			foreach ($data['status_block'] as $key => $value) {
				if ($value == 'featured_status' and !empty($setting['product'])) {
					$results = array_slice($setting['product'], 0, (int)$setting['limit']);
				}
				if ($value == 'bestseller_status') {
					$results = $this->model_catalog_product->getBestSellerProducts($setting['limit']);
				}
				if ($value == 'latest_status') {
					$filter_data = array(
						'sort'  => 'p.date_added',
						'order' => 'DESC',
						'start' => 0,
						'limit' => $setting['limit']
					);

					$results = $this->model_catalog_product->getProducts($filter_data);
				}
				if ($value == 'special_status') {
					$filter_data = array(
						'sort'  => 'pd.name',
						'order' => 'ASC',
						'start' => 0,
						'limit' => $setting['limit']
					);
					$results = $this->model_catalog_product->getProductSpecials($filter_data);
				}
				foreach ($results as $result) {
					if ($value == 'featured_status') {
						$temp_id = $result;
						$product_info = $this->model_catalog_product->getProduct($temp_id);
					}
					if ($value == 'bestseller_status') {
						$temp_id = $result['product_id'];
						$product_info = $result;
					}
					if ($value == 'latest_status' or $value == 'special_status') {
						$temp_id = $result['product_id'];
						$product_info = $result;
					}
					if ($product_info) {
						if ($product_info['image']) {
							$image = $this->model_tool_image->resize($product_info['image'], $setting['width'], $setting['height']);
						} else {
							$image = $this->model_tool_image->resize('placeholder.png', $setting['width'], $setting['height']);
						}

						if ($this->customer->isLogged() || !$this->config->get('config_customer_price')) {
							$price = $this->currency->format($this->tax->calculate($product_info['price'], $product_info['tax_class_id'], $this->config->get('config_tax')), $this->session->data['currency']);
						} else {
							$price = false;
						}

						if ((float)$product_info['special']) {
							$special = $this->currency->format($this->tax->calculate($product_info['special'], $product_info['tax_class_id'], $this->config->get('config_tax')), $this->session->data['currency']);
						} else {
							$special = false;
						}

						if ($this->config->get('config_tax')) {
							$tax = $this->currency->format((float)$product_info['special'] ? $product_info['special'] : $product_info['price'], $this->session->data['currency']);
						} else {
							$tax = false;
						}

						if ($this->config->get('config_review_status')) {
							$rating = $product_info['rating'];
						} else {
							$rating = false;
						}
						
						if ($product_info['image']) {$imageaddit = $this->model_tool_image->resize($product_info['image'], $this->config->get('theme_' . $this->config->get('config_theme') . '_image_additional_width'), $this->config->get('theme_' . $this->config->get('config_theme') . '_image_additional_height'));} else {$imageaddit = $this->model_tool_image->resize('no_image.jpg', $this->config->get('theme_' . $this->config->get('config_theme') . '_image_additional_width'), $this->config->get('theme_' . $this->config->get('config_theme') . '_image_additional_height'));}
						$imgs = $this->model_catalog_product->getProductImages($temp_id);
						$imgt = array();
						foreach ($imgs as $imgi) {
							$imgt[] = array(
								'thumb' => $this->model_tool_image->resize($imgi['image'], $setting['width'], $setting['height'])
							);
						}
						if ((float)$product_info['special']) {
							$temp_special = $this->currency->format($this->tax->calculate($product_info['special'], $product_info['tax_class_id'], $this->config->get('config_tax')), $this->session->data['currency'], '', false);
							$temp_price = $this->currency->format($this->tax->calculate($product_info['price'], $product_info['tax_class_id'], $this->config->get('config_tax')), $this->session->data['currency'], '', false);
							$procent = '';
							$procent .= '-';
							$procent .= ($temp_price - $temp_special)/$temp_price*100;
							$procent = (int)$procent;
							$procent .= '%';
						} else {
							$procent = false;
						}
						
						if ($value == 'featured_status') {
							$data['products_featured'][] = array(
								'product_id'  => $product_info['product_id'],
								'thumb'       => $image,
								'name'        => $product_info['name'],
								'description' => utf8_substr(strip_tags(html_entity_decode($product_info['description'], ENT_QUOTES, 'UTF-8')), 0, $this->config->get('theme_' . $this->config->get('config_theme') . '_product_description_length')) . '..',
								'price'       => $price,
								'imageaddit' => $imageaddit,
								'images' => $imgt,
								'procent' => $procent,
								'special'     => $special,
								'tax'         => $tax,
								'rating'      => $rating,
								'href'        => $this->url->link('product/product', 'product_id=' . $product_info['product_id'])
							);
						}
						if ($value == 'bestseller_status') {
							$data['products_bestseller'][] = array(
								'product_id'  => $product_info['product_id'],
								'thumb'       => $image,
								'name'        => $product_info['name'],
								'description' => utf8_substr(strip_tags(html_entity_decode($product_info['description'], ENT_QUOTES, 'UTF-8')), 0, $this->config->get('theme_' . $this->config->get('config_theme') . '_product_description_length')) . '..',
								'price'       => $price,
								'imageaddit' => $imageaddit,
								'images' => $imgt,
								'procent' => $procent,
								'special'     => $special,
								'tax'         => $tax,
								'rating'      => $rating,
								'href'        => $this->url->link('product/product', 'product_id=' . $product_info['product_id'])
							);
						}
						if ($value == 'special_status') {
							$data['products_special'][] = array(
								'product_id'  => $product_info['product_id'],
								'thumb'       => $image,
								'name'        => $product_info['name'],
								'description' => utf8_substr(strip_tags(html_entity_decode($product_info['description'], ENT_QUOTES, 'UTF-8')), 0, $this->config->get('theme_' . $this->config->get('config_theme') . '_product_description_length')) . '..',
								'price'       => $price,
								'imageaddit' => $imageaddit,
								'images' => $imgt,
								'procent' => $procent,
								'special'     => $special,
								'tax'         => $tax,
								'rating'      => $rating,
								'href'        => $this->url->link('product/product', 'product_id=' . $product_info['product_id'])
							);
						}
						if ($value == 'latest_status') {
							$data['products_latest'][] = array(
								'product_id'  => $product_info['product_id'],
								'thumb'       => $image,
								'name'        => $product_info['name'],
								'description' => utf8_substr(strip_tags(html_entity_decode($product_info['description'], ENT_QUOTES, 'UTF-8')), 0, $this->config->get('theme_' . $this->config->get('config_theme') . '_product_description_length')) . '..',
								'price'       => $price,
								'imageaddit' => $imageaddit,
								'images' => $imgt,
								'procent' => $procent,
								'special'     => $special,
								'tax'         => $tax,
								'rating'      => $rating,
								'href'        => $this->url->link('product/product', 'product_id=' . $product_info['product_id'])
							);
						}
					}
				}
			}
		}
		
		return $this->load->view('extension/module/mastermodule', $data);
	}
}