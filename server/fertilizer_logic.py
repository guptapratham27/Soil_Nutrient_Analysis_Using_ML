IDEAL = {"N": 100, "P": 40, "K": 50}

FERTILIZERS = {
    "Urea": {"N": 46, "P": 0, "K": 0},
    "DAP": {"N": 18, "P": 46, "K": 0},
    "MAP": {"N": 11, "P": 52, "K": 0},
    "SSP": {"N": 0,  "P": 14, "K": 0},
    "MOP": {"N": 0,  "P": 0,  "K": 60},
    "NPK 10-26-26": {"N": 10, "P": 26, "K": 26},
    "NPK 20-20-20": {"N": 20, "P": 20, "K": 20}
}

def recommend_fertilizer(N, P, K):
    # Calculate nutrient deficits (positive = low, negative = excess)
    deficits = {
        "N": IDEAL["N"] - N,
        "P": IDEAL["P"] - P,
        "K": IDEAL["K"] - K
    }

    best_fert = None
    best_score = float("inf")

    # Find the fertilizer whose NPK composition matches the deficit best
    for fert, comp in FERTILIZERS.items():
        score = (
            abs(deficits["N"] - comp["N"]) +
            abs(deficits["P"] - comp["P"]) +
            abs(deficits["K"] - comp["K"])
        )

        if score < best_score:
            best_score = score
            best_fert = fert

    explanation = (
        f"Nutrient deficits → N: {round(deficits['N'],4)}, P: {round(deficits['P'],4)}, K: {round(deficits['K'],4)}. "
        f"Based on this, '{best_fert}' best matches the soil's nutrient needs."
    )

    return best_fert, explanation
