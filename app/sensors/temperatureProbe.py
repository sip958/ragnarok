import random

class temperatureProbe:
    def __init__(self, app, name = 'MashTunTemperatureProbe'):
        self.app = app
        self.name = name
        self.value = 0
    
    def get(self):
        # test value
        self.value = random.randrange(0, 100)
        return self.value
    
    async def sendToWebSocket(self):
        tempValue = self.get()
        await self.app.ws.send(tempValue, self.name)