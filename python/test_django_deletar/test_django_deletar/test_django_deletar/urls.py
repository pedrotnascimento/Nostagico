from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    # Examples:
    url(r'^$', 'app1.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^contact/$', 'app1.views.contact', name='contact'),
    url(r'^api/modelEG', "app1.api.urls"),

    url(r'^admin/', include(admin.site.urls)),
      
]
