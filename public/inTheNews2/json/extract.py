from time import *
from datetime import datetime
import urllib2
import time



for u in range(0,20):
	endTime = time.time() - u*24*3600
	endDate = datetime.utcfromtimestamp(endTime)
	extraMonth = ''
	extraDay = ''
	if endDate.month < 10:
		extraMonth = '0'
	if endDate.day < 10:
		extraDay = '0'
	dayFormat = str(endDate.year)+"-"+extraMonth+str(endDate.month)+'-'+extraDay+str(endDate.day)

	html = urllib2.urlopen('http://retinanews.net/api/topics/filter?day='+dayFormat).read()
	with open(dayFormat+".json", "w") as f:
		f.write(html)
	print "Extracted ", dayFormat