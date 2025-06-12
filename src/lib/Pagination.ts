import NodeCache from 'node-cache';

// 创建一个全局缓存实例
const myCache = new NodeCache({
  stdTTL: 3600, // 缓存数据在x秒后过期
  checkperiod: 600, // 检查过期数据的间隔时间（秒）
  maxKeys: 100
});

export default class Pagination {
  constructor(
    private readonly params: any,
    private readonly pageName: string,
  ) {}
  async getCurrentPageData(order: 'asc' | 'desc' = 'desc') {
    const defaultPage = 1;
    const defaultLimit = 25;

    const cursor = this.params?.nextCursor;
    const page = this.params?.page || defaultPage;
    const limit = this.params?.limit || defaultLimit;
    const category = this.params?.category || '';
    let url;
    if (!cursor) {
      url = `${process.env.NEXT_PUBLIC_API_URL}/api/data/${this.pageName}?page=${page}&limit=${limit}&category=${category}&order=${order}`;
    } else {
      url = `${process.env.NEXT_PUBLIC_API_URL}/api/data/${this.pageName}/${cursor}?page=${page}&limit=${limit}&category=${category}&order=${order}`;
    }

    // 检查缓存中是否存在数据
    const cachedData = myCache.get(url);
    if (cachedData) {
      return cachedData;
    }

    const res = await fetch(url, {
      next: {
        revalidate: 60 * 60, // 1小时后重新验证
      },
    });
    const data = await res.json();

    // 将数据存入缓存
    myCache.set(url, data);

    return data;
  }
  nextPageUrl(data: any) {
    const defaultLimit = 25;
    let currentPage = this.params?.page || 1;
    const currentLimit = this.params?.limit || defaultLimit;
    const category = this.params?.category || '';
    if (currentPage && currentLimit) {
      let currentTotal = (+currentPage + 1) * +currentLimit;
      //const pageEnd = data[this.pageName]?.end;
      //const hasMore = data[this.pageName]?.has_more;
      let nextCursor = this.params?.nextCursor;
      let nextPageUrl;
      if (currentTotal > 100 || nextCursor) {
        if (currentTotal > 100) {
          currentPage = '0';
          currentTotal = defaultLimit;
          nextCursor = data[this.pageName]?.next_cursor;
        }
        if (data[this.pageName]?.length < defaultLimit) {
          currentTotal = data[this.pageName]?.length;
        }
        nextPageUrl = `/${this.pageName}?&page=${
          Number(currentPage) + 1
        }&nextCursor=${nextCursor}${category ? `&category=${category}` : ''}`;
      } else {
        nextPageUrl = `/${this.pageName}?&page=${Number(currentPage) + 1}${
          category ? `&category=${category}` : ''
        }`;
      }
      return nextPageUrl;
    }
  }
}
