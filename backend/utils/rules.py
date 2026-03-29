from constants import *

def check_rain(data):
    if data["rain_mm"] > RAIN_THRESHOLD:
        return {
            "type": "FLOOD_ALERT",
            "severity": "HIGH",
            "message": "Heavy rainfall detected"
        }
    else: return None

def check_aqi(data):
    if data["aqi"] > AQI_THRESHOLD:
        return {
            "type": "AIR_QUALITY_ALERT",
            "severity": "HIGH",
            "message": "Hazardous air quality"
        }
    else: return None


def check_temperature(data):
    if data["temperature"] > TEMP_THRESHOLD:
        return {
            "type": "HEATWAVE_ALERT",
            "severity": "MEDIUM",
            "message": "High temperature detected"
        }
    else: return None


def check_traffic(data):
    if data["traffic_index"] > TRAFFIC_THRESHOLD:
        return {
            "type": "TRAFFIC_ALERT",
            "severity": "MEDIUM",
            "message": "Heavy traffic congestion"
        }
    else: return None