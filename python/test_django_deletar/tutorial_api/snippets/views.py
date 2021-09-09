from django.shortcuts import render


"""
OUTROS COMMITS TEM MAIS CODIGOS
ESTE PARECE SER O MAIS RECOMENDADO
OBVIAMENTE ESTE NAO EH O PADRAO A SER USADO
OLHAR PEP8 CODE CONVENTION FOR MORE
"""

# Create your views here.

from snippets.models import Snippet
from snippets.serializers import SnippetSerializer
from rest_framework import generics

from django.contrib.auth.models import User
from snippets.serializers import UserSerializer


from rest_framework import permissions
from snippets.permissions import IsOwnerOrReadOnly

from rest_framework.decorators import  api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework import renderers

@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'users': reverse('user-list', request=request, format=format),
        'snippets': reverse('snippet-list', request=request, format=format)
    })


class SnippetHighlight(generics.GenericAPIView):
    queryset = Snippet.objects.all()
    renderer_classes = (renderers.StaticHTMLRenderer)

    def get(self, request, *args, **kwargs):
        snippet = self.get_object()
        return Response(snippet.highlighted)

# cara parece que esse eh o melhor para aplicacao CRUD
class SnippetList(generics.ListCreateAPIView):
    """
    List all snippets, or create a new snipet
    """
    queryset = Snippet.objects.all()
    serializer_class= SnippetSerializer
    #permission_classes = (permissions.IsAuthenticatedOrReadOnly,) #que loucura, dicionario precisa da virgula no final  ---> (one tuple element)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
"""# ONE STEP FOWARD IN CLASS GENERIC VIEW
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, format=None):
        return self.create(request, *args, **kwargs)
"""

# REPARA QUE O NOME NO ARGUMENTO DA CLASSE
# JA INDUZ QUAL APIS ELE TERA(Retrieve Update Destroy )
class SnippetDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a snippet instance
    """
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                            IsOwnerOrReadOnly)

"""# ONE STEP FOWARD IN CLASS GENERIC VIEW
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
"""

class UserList(generics.ListCreateAPIView):
    queryset=User.objects.all()
    serializer_class=UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
