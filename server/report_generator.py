from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.utils import ImageReader
import io

def wrap_text(text, max_width, pdf, font_name="Helvetica", font_size=12):
    """
    Splits text into lines based on PDF width.
    """
    pdf.setFont(font_name, font_size)
    words = text.split(" ")
    lines = []
    current_line = ""

    for word in words:
        test_line = current_line + " " + word if current_line else word
        if pdf.stringWidth(test_line, font_name, font_size) <= max_width:
            current_line = test_line
        else:
            lines.append(current_line)
            current_line = word
    if current_line:
        lines.append(current_line)

    return lines

def generate_report_pdf(n, p, k, fertilizer, explanation, features):
    buffer = io.BytesIO()
    pdf = canvas.Canvas(buffer, pagesize=letter)

    width, height = letter

    # ---------------------------------------
    #  TOP MARGIN & HEADER SECTION
    # ---------------------------------------
    pdf.setFillColor(colors.black)

    # Add logo (optional)
    try:
        logo = ImageReader("server/static/favicon.png")   
        pdf.drawImage(logo, 50, height - 110, width=80, preserveAspectRatio=True)
    except:
        pass  # If no logo, continue silently

    # Project Title
    pdf.setFont("Helvetica-Bold", 22)
    pdf.drawString(150, height - 70, "SoilIQ - Soil Nutrient Report")

    pdf.setFont("Helvetica", 12)
    pdf.setFillColor(colors.grey)
    pdf.drawString(150, height - 90, "Smarter Soil Insights for Better Farming.")

    pdf.setFillColor(colors.black)

    # Add a divider line
    pdf.setStrokeColor(colors.HexColor("#8bc34a"))
    pdf.setLineWidth(2)
    pdf.line(50, height - 120, width - 50, height - 120)

    y = height - 160  # Start content BELOW header area

    # ---------------------------------------
    #  INPUT SECTION
    # ---------------------------------------
    pdf.setFont("Helvetica-Bold", 16)
    pdf.drawString(50, y, "Input Parameters")
    y -= 25

    pdf.setFont("Helvetica", 12)
    spacing = 18

    pdf.drawString(60, y, f"Temperature: {features['temperature']} °C")
    y -= spacing
    pdf.drawString(60, y, f"Humidity: {features['humidity']} %")
    y -= spacing
    pdf.drawString(60, y, f"Soil Moisture: {features['moisture']} %")
    y -= spacing
    pdf.drawString(60, y, f"Soil Type: {features['soilType']}")
    y -= spacing
    pdf.drawString(60, y, f"Crop Type: {features['cropType']}")
    y -= spacing

    # Extra spacing before next section
    y -= 15

    # ---------------------------------------
    #  PREDICTED NPK VALUES
    # ---------------------------------------
    pdf.setFont("Helvetica-Bold", 16)
    pdf.drawString(50, y, "Nutrient Predictions")
    y -= 25

    pdf.setFont("Helvetica", 12)
    pdf.drawString(60, y, f"Nitrogen (N): {n:.3f} mg/kg")
    y -= spacing
    pdf.drawString(60, y, f"Phosphorous (P): {p:.3f} mg/kg")
    y -= spacing
    pdf.drawString(60, y, f"Potassium (K): {k:.3f} mg/kg")
    y -= spacing

    # Extra spacing
    y -=20

    # ---------------------------------------
    #  FERTILIZER RECOMMENDATION
    # ---------------------------------------
    pdf.setFont("Helvetica-Bold", 16)
    pdf.drawString(50, y, "Recommended Fertilizer")
    y -= 30

    # Nice green box
    pdf.setFillColor(colors.HexColor("#e8f5e9"))
    pdf.roundRect(50, y - 40, 500, 60, 10, fill=1)
    pdf.setFillColor(colors.black)

    pdf.setFont("Helvetica-Bold", 14)
    pdf.drawString(60, y, fertilizer)

    y -= 70

    # Explanation text
    pdf.setFont("Helvetica", 12)
    explanation_lines = wrap_text(explanation, 480, pdf)
    for line in explanation_lines:
        pdf.drawString(60, y, line)
        y -= 15

    pdf.setStrokeColor(colors.HexColor("#8bc34a"))
    pdf.setLineWidth(2)
    pdf.line(50, height - 120, width - 50, height - 120)

    # Footer
    
    pdf.setFillColor(colors.grey)
    pdf.setFont("Helvetica-Oblique", 10)
    pdf.drawString(50, 40, "Note: These predictions are based on inputs and may not reflect exact soil chemistry.")
    pdf.drawString(50, 25, "© SoilIQ - AI Powered Soil Nutrient Prediction")

    pdf.save()
    buffer.seek(0)
    return buffer
