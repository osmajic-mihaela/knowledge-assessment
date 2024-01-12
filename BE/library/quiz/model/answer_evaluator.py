import openai
from config import ConfigGPT


def evaluate_answer(question, correct_answer, student_answer, points):
    openai.organization = ConfigGPT.organization
    openai.api_key = ConfigGPT.api_key
    prompt = f"Na pitanje:\"{question}\" očekivan odgovor je:\"{correct_answer}\"\nDa li bi u odnosu očekivan odgovor,\"{student_answer}\" bio tačan na dato pitanje,odgovori sa da/ne"

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ]
    )

    generated_response = response['choices'][0]['message']['content']
    res = generated_response.lower()
    res = res.replace(",", "")
    res = res.replace(".", "")

    if res.startswith("da"):
        return points, generated_response
    elif res.startswith("ne"):
        return 0, generated_response
    else:
        return -1, generated_response



