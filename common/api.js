import {
	baseUrl
} from './config.js';
// import 'weapp-cookie'
let time = Date.now()



export function indexList(page, magnetType) {
	return uni.request({
		url: `${baseUrl}/index/${page}/${magnetType}`,
		method: 'GET'
	});
}

export function detail(id) {
	return uni.request({
		url: `${baseUrl}/detail/${id}`,
		method: 'GET'
	});
}

export function getStarsDetail(data) {
	return uni.request({
		url: `${baseUrl}/starsDetail`,
		method: 'POST',
		data:data
	});
}

export function starSearch(page, id) {
	return uni.request({
		url: `${baseUrl}/starSearch/${page}/${id}`,
		method: 'GET',
	});
}

export function search(page, keyword) {
	return uni.request({
		url: `${baseUrl}/search/${page}/${keyword}`,
		method: 'GET',
	});
}