from django.conf.urls import include, url
from django.contrib import admin


urlpatterns = [
    # Examples:
    # url(r'^$', 'tutorial_api.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^', include('snippets.urls')), # this way the project can take the urls inside the app snippet and renderize

    url(r'^admin/', include(admin.site.urls)),
]
    
