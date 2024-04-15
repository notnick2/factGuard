import scrapy
from scrapy import Selector

class GoogleSearchSpider(scrapy.Spider):
    name = 'google_search'
    start_urls = ['https://www.google.com/search?q=jakkula+varun']

    def parse(self, response):
        # Extracting the HTML content
        html_content = response.body
        
        # Using Scrapy Selector to parse the HTML
        selector = Selector(text=html_content)
        
        # XPath to extract all links from search results
        links = selector.xpath('//div[@class="tF2Cxc"]/div[@class="yuRUbf"]/a/@href').extract()
        
        # Printing all the extracted links
        for link in links:
            print(link)
