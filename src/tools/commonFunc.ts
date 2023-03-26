export default class CommonFunc {
  /**
   * 去重数组
   * @param arr 需要去重的数组
   * @returns 去重后的数组
   */
  static uniqueArray(arr: any[]): any[] {
    return Array.from(new Set(arr));
  }

  /**
   * 通过key值处理对象数组去重
   * @param arr 需要去重的对象数组
   * @param key 对象的key值
   * @returns 去重后的对象数组
   */
  static uniqueObjectArray(arr: any[], key: string): any[] {
    const map = new Map();
    arr.forEach((item) => {
      const keyValue = item[key];
      if (!map.has(keyValue)) {
        map.set(keyValue, item);
      }
    });
    return Array.from(map.values());
  }


}
