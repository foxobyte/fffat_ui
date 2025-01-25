export default function getDeviceType() {
    const userAgent = navigator.userAgent;
  
    if (/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      return 'Mobile';
    } else if (/iPad|Tablet/i.test(userAgent)) {
      return 'Tablet';
    } else {
      return 'Desktop';
    }
  }