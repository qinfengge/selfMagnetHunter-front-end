import {
	baseUrl
} from './config.js';
// import 'weapp-cookie'
let time = Date.now()



export function indexList(page, magnetType) {
	return uni.request({
		url: `${baseUrl}/rss/index/${page}/${magnetType}`,
		method: 'GET'
	});
}

export function detail(id) {
	return uni.request({
		url: `${baseUrl}/rss/detail/${id}`,
		method: 'GET'
	});
}

export function getStarsDetail(data) {
	return uni.request({
		url: `${baseUrl}/rss/starsDetail`,
		method: 'POST',
		data:data
	});
}

export function starSearch(page, id) {
	return uni.request({
		url: `${baseUrl}/rss/starSearch/${page}/${id}`,
		method: 'GET',
	});
}

export function search(page, keyword) {
	return uni.request({
		url: `${baseUrl}/rss/search/${page}/${keyword}`,
		method: 'GET',
	});
}

export function ranking(type) {
	return uni.request({
		url: `${baseUrl}/ranking/ranking/${type}`,
		method: 'GET',
	});
}