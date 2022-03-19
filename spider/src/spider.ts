import superagent from "superagent"; // 使用js编写的库，缺少类型声明文件，ts编译器不能直接使用这种库，需要安装.d.ts翻译文件

class Spider {
  private url = ""; // 爬虫目标url
  private rawHtml = ""; 

  async getRawHtml() {
    const res = await superagent.get(this.url);
    this.rawHtml = res.text;
  }
  constructor() {
    this.getRawHtml();
  }
}
const spider = new Spider();
