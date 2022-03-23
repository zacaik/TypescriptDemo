import superagent from "superagent"; // 使用js编写的库，缺少类型声明文件，ts编译器不能直接使用这种库，需要安装.d.ts翻译文件, 安装方法一般为@types/包名
import cheerio from "cheerio";
import fs from 'fs';
import path from 'path';
interface Course {
  title: string;
  count: number;
}

interface CourseResult {
  time: number;
  data: Course[];
}

interface Content {
  [propName: number]: Course[];
}

class Spider {
  private url = ""; // 爬虫目标url

  getJsonInfo(html: string) {
    const $ = cheerio.load(html);
    const items = $(".course-item");
    const courseInfo: Course[] = [];
    items.map((index, element) => {
      const desc = $(element).find(".course-desc"); // 根据html结构获取html元素
      const title = desc.eq(0).text(); // 获取页面模块的标题
      const count = parseInt(desc.eq(0).text().split("：")[1], 10); // 获取页面元素中的指定文本并转换成对应类型
      courseInfo.push({ title, count });
    });
    const res = {
      time: new Date().getTime(),
      data: courseInfo,
    }
    return res;
  }

  async getRawHtml() {
    let html = "";
    try {
      const res = await superagent.get(this.url);
      html = res.text;
    } catch (error) {
      console.log(error);
    }
    return html;
  }

  async initSpiderProcess() {
    const filePath = path.resolve(__dirname, "../data/course.json");
    const html = await this.getRawHtml();
    const res = this.getJsonInfo(html); // 分析获取到的html文档
    const fileContent = this.generateJsonContent(res);
    fs.writeFileSync(filePath, JSON.stringify(fileContent));
  }

  // 将获取到的页面信息转换为json文件
  generateJsonContent(res: CourseResult) {
    const filePath = path.resolve(__dirname, "../data/course.json");
    console.log(filePath);
    let fileContent: Content = {};
    if (fs.existsSync(filePath)) {
      console.log(fs.readFileSync(filePath, 'utf-8'));
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    fileContent[res.time] = res.data;
    return fileContent;
  }

  constructor() {
    this.initSpiderProcess();
  }
}
const spider = new Spider();
