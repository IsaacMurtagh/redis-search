module.exports = class Merchant {
  constructor(props) {
    this.id = props.id;
    this.accountId = props.accountId;
    this.name = props.name;
    this.test = props.test;
    this.region = props.region;
    this.city = props.city;
    this.createdAt = props.createdAt;
    this.lngLat = props.latitude && props.longitude && `${props.longitude},${props.latitude}`;
  }

  static fromJson(data) {
    return new Merchant({
      ...data,
      test: !!data.test,
      id: data.merchantId,
      createdAt: data.createdAt && new Date(data.createdAt).getTime(),
    });
  }

  toRedisFields() {
    return Object.keys(this).reduce((acc, curr) => {
      if (this[curr] != undefined) {
        return [...acc, curr, String(this[curr])]
      }
      return acc;
    },[])
  }
}