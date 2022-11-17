import React from 'react';

const HomePage = () => {
	// useEffect(() => {
	// 	function success({ coords, timestamp }: { coords: any; timestamp: any }) {
	// 		const [latitude, longitude] = coords; // 경도

	// 		alert(
	// 			`위도: ${latitude}, 경도: ${longitude}, 위치 반환 시간: ${timestamp}`,
	// 		);
	// 		document.location.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
	// 	}

	// 	function getUserLocation() {
	// 		if (!navigator.geolocation) throw Error('위치 정보가 지원되지 않습니다.');
	// 		navigator.geolocation.getCurrentPosition(success);
	// 	}
	// 	try {
	// 		getUserLocation();
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }, []);

	return <div />;
};

export default HomePage;
