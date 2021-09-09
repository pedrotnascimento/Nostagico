from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
      Custom permission to only allow owners of an object to edit it.
    """

    #parece que este contrato eh padrao, assim como o nome da funcao
    def has_object_permission(self, request, view, obj):
        # Read permissions is allowed to any request
        # always allow for safe_methods GET,HEAD or OPTIONS
        if request.method in permissions.SAFE_METHODS:
            return True
        
        return obj.owner == request.user
         