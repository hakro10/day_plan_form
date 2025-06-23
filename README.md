# 🎓 Learning Projects - Programming Fundamentals

A comprehensive learning platform featuring structured courses in Python and SQL, designed for beginners and intermediate learners.

## 📚 Available Courses

### 🐍 Python Fundamentals (10 Days)
**Location**: `Python_fundamentals/`

A complete Python programming course covering everything from basic syntax to object-oriented programming.

**Topics Covered**:
- Variables, data types, and I/O operations
- Operators, conditionals, and loops  
- Data structures (lists, tuples, dictionaries, sets)
- Functions and scope
- File handling and error management
- Modules and packages
- Object-oriented programming

**Start Here**: `Python_fundamentals/README.md`

### 🗄️ SQL School (25 Days)
**Location**: `SQL_school/`

An extensive SQL course with hands-on PostgreSQL database exercises, from basic queries to advanced database administration.

**Topics Covered**:
- SQL fundamentals and query operations
- Joins, subqueries, and advanced analytics
- Window functions and CTEs
- Stored procedures, triggers, and functions
- Performance optimization and indexing
- Security and user management
- ETL processes and data import/export

**Start Here**: `SQL_school/README.md`

## 🚀 Quick Start Guide

### Choose Your Learning Path

#### Option 1: Python First (Recommended for Complete Beginners)
```bash
cd Python_fundamentals
python --version  # Ensure Python 3.7+ is installed
python Day01/exercises.py
```

#### Option 2: SQL First (For Data-Focused Learning)
```bash
cd SQL_school
docker-compose up -d  # Start PostgreSQL database
python check_connection.py
```

#### Option 3: Parallel Learning (For Experienced Programmers)
Study both courses simultaneously, alternating days or focusing on specific topics.

## 📂 Project Structure

```
Learning_projects/
├── Python_fundamentals/          # 10-day Python course
│   ├── Day01-Day10/             # Daily lessons
│   ├── exercise_checker.py      # Automated validation
│   └── README.md                # Python course guide
├── SQL_school/                  # 25-day SQL course  
│   ├── Day01-Day25/             # Daily lessons
│   ├── docker-compose.yml       # Database setup
│   ├── setup_database.py        # Database initialization
│   └── README.md                # SQL course guide
├── README.md                    # This file
└── requirements.txt             # Python dependencies
```

## 🎯 Learning Objectives

### After Completing Python Fundamentals:
- ✅ Write clean, readable Python code
- ✅ Work with data structures and files
- ✅ Implement object-oriented programming
- ✅ Handle errors and exceptions
- ✅ Create modular, reusable code

### After Completing SQL School:
- ✅ Design and query relational databases
- ✅ Optimize database performance
- ✅ Implement security and access controls
- ✅ Build ETL pipelines
- ✅ Manage enterprise database systems

### After Completing Both Courses:
- ✅ Full-stack data processing capabilities
- ✅ Backend development skills
- ✅ Database application development
- ✅ Data analysis and reporting
- ✅ Automated data pipeline creation

## 🛠️ Prerequisites

### For Python Course:
- **Python 3.7+** installed
- Text editor or IDE
- Basic computer literacy

### For SQL Course:
- **Docker and Docker Compose** installed
- **Python 3.7+** (for utilities)
- Basic understanding of data concepts

### System Requirements:
- **OS**: Windows 10+, macOS 10.14+, or Linux
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free space
- **Network**: Internet connection for setup

## 🎓 Recommended Learning Paths

### Path 1: Complete Beginner
1. **Week 1-2**: Python Fundamentals (Days 1-10)
2. **Week 3-8**: SQL School (Days 1-25)
3. **Week 9**: Integration projects combining both skills

### Path 2: Data-Focused Learning
1. **Week 1**: Python basics (Days 1-4)
2. **Week 2-6**: SQL School (Days 1-25)
3. **Week 7**: Advanced Python (Days 5-10)
4. **Week 8**: Data projects using both technologies

### Path 3: Accelerated Track
1. **Python**: 1 lesson per day (10 days)
2. **SQL**: 1 lesson per day (25 days)
3. **Integration**: 5 days of combined projects
4. **Total**: 40-day intensive program

## 📊 Progress Tracking

### Python Progress
```bash
cd Python_fundamentals
python exercise_checker.py --progress
```

### SQL Progress
```bash
cd SQL_school
python quick_progress.py
```

## 🤝 Getting Help

### Course-Specific Help:
- **Python**: Check `Python_fundamentals/README.md`
- **SQL**: Check `SQL_school/README.md`

### General Troubleshooting:
1. **Setup Issues**: Verify prerequisites are installed
2. **Exercise Problems**: Use built-in checkers and validators
3. **Concept Confusion**: Review theory files in each day's folder

## 🌟 What's Next?

After completing these fundamentals courses, consider exploring:

### Advanced Python Topics:
- **Web Development**: Django, Flask, FastAPI
- **Data Science**: NumPy, Pandas, Matplotlib, Jupyter
- **Machine Learning**: Scikit-learn, TensorFlow, PyTorch
- **Automation**: Selenium, Beautiful Soup, APIs

### Advanced SQL and Database Topics:
- **NoSQL Databases**: MongoDB, Redis, Elasticsearch
- **Data Warehousing**: Snowflake, BigQuery, Redshift
- **Real-time Processing**: Apache Kafka, Stream Processing
- **Cloud Databases**: AWS RDS, Azure SQL, Google Cloud SQL

### Integration Projects:
- **Web Applications**: Python backend with SQL database
- **Data Pipelines**: ETL processes using Python and SQL
- **Analytics Dashboards**: Data visualization with Python and SQL
- **APIs**: RESTful services connecting to databases

## 📈 Success Metrics

Track your learning progress:

- **Python**: Complete all 10 days with passing exercise scores
- **SQL**: Complete all 25 days with functional database projects
- **Integration**: Build at least one project combining both skills
- **Community**: Share your projects and help other learners

---

## 🔧 Technical Setup

### Initial Environment Setup:
```bash
# Clone or download the learning projects
# Navigate to the project directory
cd Learning_projects

# Install Python dependencies
pip install -r requirements.txt

# Choose your starting course
cd Python_fundamentals  # OR cd SQL_school
```

### Troubleshooting Common Issues:

#### Python Not Found:
```bash
# Try these alternatives:
python3 --version
py --version
```

#### Docker Issues:
```bash
# Restart Docker service
# Check Docker installation
docker --version
docker-compose --version
```

## 📝 Course Credits

These courses were designed as comprehensive, hands-on learning experiences that emphasize:

- **Practical Application**: Real-world projects and exercises
- **Progressive Learning**: Building complexity gradually
- **Best Practices**: Industry-standard coding and database practices
- **Automated Feedback**: Built-in validation and progress tracking

**Happy Learning! 🚀**

*Remember: The best way to learn programming is by doing. Work through each exercise, experiment with the code, and build your own projects along the way!* 