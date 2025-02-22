from django.shortcuts import render
import openai
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings

# Set up OpenAI API key
openai.api_key = settings.OPENAI_API_KEY  # Use the API key from settings

class SentimentAnalysis(APIView):
    def post(self, request):
        comment = request.data.get('comment')

        if not comment:
            return Response({"error": "No comment provided"}, status=status.HTTP_400_BAD_REQUEST)

        # Define a prompt template for Langchain
        prompt_template = "Analyze the sentiment of the following comment: {comment}"
        prompt = PromptTemplate(input_variables=["comment"], template=prompt_template)

        # Initialize LLM (e.g., OpenAI GPT)
        llm_chain = LLMChain(llm=openai.Completion.create, prompt=prompt)

        # Analyze sentiment using Langchain and OpenAI API
        response = llm_chain.run(comment)
        
        # Return the analysis result
        return Response({"sentiment": response}, status=status.HTTP_200_OK)