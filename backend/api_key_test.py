import asyncio
from semantic_kernel import Kernel
from semantic_kernel.connectors.ai.open_ai import OpenAIChatCompletion, AzureChatCompletion
from semantic_kernel.prompt_template import PromptTemplateConfig

from dotenv import load_dotenv
load_dotenv()

kernel = Kernel()
service_id="chat-gpt"

kernel.add_service(
  AzureChatCompletion(
      service_id=service_id,
      deployment_name="gpt-4o-mini",
      endpoint="https://ai-subadmin2831ai572586227195.openai.azure.com/"
  )
)

# Define the request settings
req_settings = kernel.get_prompt_execution_settings_from_service_id(service_id)
req_settings.max_tokens = 2000
req_settings.temperature = 0.7
req_settings.top_p = 0.8

prompt = """
This was extracted from a pdf document. Tell us what you recognize:

Bachelor Computervisualistik (PO 2023), Beginn im Wintersemester
   6 = 6 ECTS Credits
   Sem
   Praktische
   Informatik
   Informatik
   der Systeme
   Theoretische
   Informatik
   Mathematik
   Technische
   Informatik
   Computervisualistik
   Wahlpflicht
   Interdisziplinärer
   Bereich
   Projekt,
   Proseminar,
   Soft Skills
   ECTS
   1
   Winter
   04IN1101
   Programmieren
   und Modellieren
   6
   03MA1201
   Fachwissenschaftliche
   Voraussetzungen
   (Elementarmathematik)
   5
   04CV1101
   Einführung in die
   CV A 3
   15 ECTS aus
   interdisziplinären
   Veranstaltungen
   aus den
   Fachbereichen 1-3
   und Nicht-
   Informatik
   Veranstaltungen
   aus dem FB 4
   27
   04IN1102
   Praktikum
   Prog. und Mod.
   3
   03MA1112
   Grundlagen der
   Mathematik A: Lineare
   Algebra 1 & Analysis 1
   10
   2
   Sommer
   04IN1022
   Logik für
   Informatiker
   6
   03MA1113 Grundlagen
   der Mathematik B:
   Lineare Algebra 2 &
   Analysis 2
   9
   04IN1003
   Grundlagen der
   Rechnerarchitektur
   6
   04CV1102 Einführung
   in die CV B 3
   27
   04CV1004-1
   Software-Ergonomie
   Vorlesung 3
   3
   Winter
   04IN1103
   Algorithmen und
   Datenstrukturen
   9
   04CV1006
   Computergraphik 1 7
   28
   04CV1001
   Bildverarbeitung 1 7
   04CV1004-2
   Software-Ergonomie
   Übung 3
   04CV1103 Praktikum
   CV-Progr. 2
   4
   Sommer
   Wahlpflicht
   Informatik der
   Systeme
   6
   04IN1105
   Grundlagen der
   theoretischen
   Informatik
   9
   04CV1007
   Computergraphik 2 5
   31
   04CV1002
   Bildverarbeitung 2 5
   04CV1201
   KI für CV 6
   5
   Winter
   Wahlpflicht
   Informatik der
   Systeme
   6
   Wahlpflicht
   CV/Inf
   6
   04FB1001
   Projektpraktikum
   10
   25
   04FB1101
   Proseminar 3
   6
   Sommer
   Wahlpflicht
   Informatik
   6
   27
   Wahlpflicht
   CV/Inf 6
   Bachelorarbeit mit Kolloquium 15
   Abschluss Bachelor of Science nach 6 Semestern
   180"""

prompt_template_config = PromptTemplateConfig(
    template=prompt,
    name="tldr",
    template_format="semantic-kernel",
    execution_settings=req_settings,
)

function = kernel.add_function(
    function_name="tldr_function",
    plugin_name="tldr_plugin",
    prompt_template_config=prompt_template_config,
)

# Run your prompt
# Note: functions are run asynchronously
async def main():
    result = await kernel.invoke(function)
    print(result) # => Robots must not harm humans.

if __name__ == "__main__":
    asyncio.run(main())
# If running from a jupyter-notebook:
# await main()
