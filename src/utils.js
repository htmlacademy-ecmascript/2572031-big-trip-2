const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const dateModule = {
  formatDate: (date) => date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
  formatTime: (date) => `${date.getUTCHours()}:${date.getUTCMinutes()}`,
  formatDuration: (dateFrom, dateTo) => {
    const totalMinutes = Math.abs(Math.round((dateTo.getTime() - dateFrom.getTime()) / 1000 / 60));
    const days = Math.floor(totalMinutes / (24 * 60));
    const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
    const minutes = totalMinutes % 60;

    if (days > 0) {
      return `${days}D ${hours}H ${minutes}M`;
    } else if (hours > 0) {
      return `${hours}H ${minutes}M`;
    } else {
      return `${minutes}M`;
    }
  },
  formatDateTime: (date) => {
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = String(date.getUTCFullYear()).slice(-2); // Последние две цифры года
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
};

export {getRandomArrayElement, dateModule};

