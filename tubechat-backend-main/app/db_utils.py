import os
from dotenv import load_dotenv
import psycopg2
load_dotenv()
HOST = os.getenv("host")
DB = os.getenv("database")
USER = os.getenv("user")
PASSWORD = os.getenv("password")


host = "ep-polished-hat-25878541.us-east-2.aws.neon.tech"
database = "neondb"
user = "digispecials2"
password = "jMWNiTK42fYS"
port = 5432
  # Database connection parameters
db_params = {
    "dbname": database,
    "user": user,
    "password": password,
    "host": host,
    "port": port,
}

def connect_to_database(db_params):
    try:
        connection = psycopg2.connect(**db_params)
        cursor = connection.cursor()
        cursor.close()
        connection.close()
        print("connection established")

    except (Exception, psycopg2.Error) as error:
        print("Error while connecting to PostgreSQL:", error)



def create_video_data_table(db_params):
    try:

        connection = psycopg2.connect(**db_params)

        # Create a cursor object to interact with the database
        cursor = connection.cursor()
        check_table_sql = """
        SELECT EXISTS (
            SELECT 1
            FROM information_schema.tables
            WHERE table_name = 'pulpy_ai'
        )
        """
        
        cursor.execute(check_table_sql)
        table_exists = cursor.fetchone()[0]

        if table_exists:
            print("Table 'pulpy_ai' already exists.")
        else:
        # SQL statement to create the table
            create_table_sql = """
            CREATE TABLE pulpy_ai (
                youtube_video_id VARCHAR(20) PRIMARY KEY
            );
            """

            # Execute the SQL statement to create the table
            cursor.execute(create_table_sql)

            # Commit the changes and close the cursor and connection
            connection.commit()
            print("Table 'pulpy_ai' created successfully.")
      
        cursor.close()
        connection.close()

      

    except (Exception, psycopg2.Error) as error:
        print("error")
        print("Error creating table:", error)


def insert_video_data(result_dict):
    try:
        # Establish a connection to the database
        connection = psycopg2.connect(**db_params)

        # Create a cursor object to interact with the database
        cursor = connection.cursor()
        insert_sql = """
        INSERT INTO pulpy_ai (youtube_video_id)
        VALUES (%s)  
        """
        youtube_video_id = result_dict["id"]
        cursor.execute(insert_sql, (youtube_video_id,))
        connection.commit()
        print(f"Data for video with ID '{youtube_video_id}' inserted successfully!")
        cursor.close()
        connection.close()

        print("Data inserted successfully.")

    except (Exception, psycopg2.Error) as error:
        print("Error inserting data:", error)

def check_video_id_existence(video_id):
    try:
        connection = psycopg2.connect(**db_params)
        cursor = connection.cursor()
        count_sql = """
        select count(*) from pulpy_ai where youtube_video_id = %s
        """
        cursor.execute(count_sql, (video_id,))
        count = cursor.fetchone()[0]
        cursor.close()
        connection.close()
        return count > 0

    except (Exception, psycopg2.Error) as error:
        print("Error checking existence:", error)
        return False


def formatting_table(db_params):
    connection = psycopg2.connect(**db_params)
    cursor = connection.cursor()
    count_sql = """
    select count(*) from pulpy_ai where youtube_video_id = %s
    """
    cursor.execute(count_sql, (video_id,))
    count = cursor.fetchone()[0]
    cursor.close()
    connection.close()
    return count > 0


def drop_all_tables():
    try:
        # Establish a connection to the database
        connection = psycopg2.connect(**db_params)

        # Create a cursor object to interact with the database
        cursor = connection.cursor()

        # SQL query to get all table names in the current schema
        get_table_names_sql = """
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
        """

        # Execute the query to get table names
        cursor.execute(get_table_names_sql)

        # Fetch all table names
        table_names = cursor.fetchall()

        # Drop all tables one by one
        for table_name in table_names:
            drop_table_sql = f"DROP TABLE IF EXISTS {table_name[0]}"
            cursor.execute(drop_table_sql)

        # Commit the changes and close the cursor and connection
        connection.commit()
        cursor.close()
        connection.close()

        print("All tables dropped successfully.")

    except (Exception, psycopg2.Error) as error:
        print("Error dropping tables:", error)


# if __name__ =="__main__":
#     create_video_data_table(db_params)
#     result_dict = {
#         "id":"YAF234"
#     }
#     print(check_video_id_existence(result_dict["id"]))







