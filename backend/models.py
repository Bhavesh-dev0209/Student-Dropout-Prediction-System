from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class Student(db.Model):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, default="Anonymous")
    age = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String(20), default="Unknown")
    attendance_percent = db.Column(db.Float, nullable=False)
    avg_marks = db.Column(db.Float, nullable=False)
    prev_failures = db.Column(db.Integer, default=0)
    parents_education = db.Column(db.Integer, default=0)
    family_income = db.Column(db.Float, default=0)
    extracurricular = db.Column(db.Integer, default=0)
    behavior_issues = db.Column(db.Integer, default=0)
    predicted_risk = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, **kwargs):
        super(Student, self).__init__(**kwargs)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'age': self.age,
            'gender': self.gender,
            'attendance_percent': self.attendance_percent,
            'avg_marks': self.avg_marks,
            'prev_failures': self.prev_failures,
            'parents_education': self.parents_education,
            'family_income': self.family_income,
            'extracurricular': self.extracurricular,
            'behavior_issues': self.behavior_issues,
            'predicted_risk': self.predicted_risk,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

    def __repr__(self):
        return f'<Student {self.name} - Risk: {self.predicted_risk}>'