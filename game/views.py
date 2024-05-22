from django.http import HttpResponse

def index(request):
    line1='<h1 style="text-align: center">术士之战</h1>'
    line2='<hr>'
    line4='<a href="/play/">进入游戏</a>'
    line3='<img src="https://i0.hdslb.com/bfs/archive/4498b8d2ec51e6c6b5d1c74b25f75f69b92a8bbe.jpg" width=1950>'
    return HttpResponse(line1+line2+line4+line3)



def play(request):
    line1='<h1 style="text-align: center">游戏界面</h1>'
    line2='<a href="/">返回主页面</a>'
    line3='<img src="https://img2.baidu.com/it/u=2538863544,2490383983&fm=253&fmt=auto&app=138&f=JPEG?w=455&h=256" width=1950>'
    return HttpResponse(line1 + line2 + line3)
