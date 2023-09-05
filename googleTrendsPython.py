import sys
from pytrends.request import TrendReq

keyword = sys.argv[1]

pytrends = TrendReq(hl='ko-KR', tz=540)
kw_list = [keyword]

pytrends.build_payload(kw_list, cat=0, timeframe='today 5-y', geo='KR')
related_queries = pytrends.related_queries()

top_queries = related_queries[keyword]['top'].head(50)['query'].tolist()
for index, query in enumerate(top_queries):
    print(f"{index + 1}. {query}")
