from rest_framework import routers
from .views import ProposalViewSet
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns


# router = routers.DefaultRouter()
# router.register('api/', ProposalViewSet, 'proposals-api')

Urlpatterns = [
    path('', ProposalViewSet.as_view(), name='proposal-api')
]

urlpatterns = format_suffix_patterns(Urlpatterns)