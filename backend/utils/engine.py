from rules import check_rain, check_aqi, check_temperature, check_traffic

def run_event_engine(data: dict):
    events = []

    for rule in [check_rain, check_aqi, check_temperature, check_traffic]:
        result = rule(data)
        if result:
            events.append(result)

    return events