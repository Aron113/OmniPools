from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Proposal
from .serializer import ProposalSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class ProposalViewSet(APIView):
    def get(self, request, format=None):
        proposals = Proposal.objects.all()
        serializer = ProposalSerializer(proposals, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ProposalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CurrProposalViewSet(APIView):
    def get(self, request, adr, format=None):
        proposal = Proposal.objects.get(address=adr)
        print(proposal)
        serializer = ProposalSerializer(proposal, many=False)
        return Response(serializer.data)

