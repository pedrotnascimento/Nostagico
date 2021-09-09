from django.conf import settings
from django.core.mail import send_mail

from django.shortcuts import render

from .forms import MyFormForm, ContactForm

# Create your views here.
# this function, home, must to be indicated in url_patterns list inside urls.py in root/test_django_deletar
# must create a "templates" folder with the file home.html inside 
# the templates folder must to be inside the root app, in this case inside root/app1,
def home(request):
    title = "Welcome not logged user"

    if request.user.is_authenticated():
        title = "hello user %s" %(request.user)
    
    if request.method == "POST":
        print request.POST
    
    #add a form
    form = MyFormForm(request.POST or None)
    context = {
        "title": title,
        "form": form
    }

    if form.is_valid():
        instance = form.save(commit=False) #Commit=False save stop saving some data(like timestamp)
        instance.save() #save in database
        context = {
        "title": "Thank you",
        }

    return render(request, "home.html", context)

def contact(request):
    form = ContactForm(request.POST or None)
    context = {
        "form": form
    }
    if form.is_valid():
        subject = "site contact form"
        from_email = settings.EMAIL_HOST_USER
        to_email = [from_email] #fill the list with more emails
        contact_message = "%s: %s via %s"%(
            form.cleaned_data.get("full_name"),
            form.cleaned_data.get("message"),
            form.cleaned_data.get("email")
        )
        html_code = "<h1>Hello </h1>"
        send_mail(subject,contact_message,from_email, to_email,
                    html_message=html_code, fail_silently=False)

    return render(request,"contact.html", context)
