import * as cheerio from "cheerio";
import type { NewsItem } from "@shared/types";

export default defineSource(async () => {
    const baseURL = "https://forum.butian.net";
    const html: any = await myFetch("https://forum.butian.net/community/all/newest"); // 替换为社区页面的URL
    const $ = cheerio.load(html);
    const $main = $(".stream-list-item"); // 查找所有文章条目
    const news: NewsItem[] = [];

    $main.each((_, el) => {
        const a = $(el).find(".title > a.detail-source"); // 查找标题和URL所在的<a>标签
        const url = a.attr("href");
        const title = a.text().trim(); // 提取标题

        if (url && title) {
            news.push({
                url: url, // 拼接完整的URL
                title,
                id: url, // 使用URL作为唯一ID
                extra: {
                    // 可以添加其他信息，如日期、作者等
                },
            });
        }
    });

    return news;
});
