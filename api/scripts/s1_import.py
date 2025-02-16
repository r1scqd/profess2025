import pandas
import psycopg2

con = psycopg2.connect("postgresql://bml:bml@localhost:5422/profess_v2")

cur = con.cursor()
df = pandas.read_excel('data.xlsx')
dep_id = 1

for row in df.iterrows():
    if row[0] < 6:
        continue

    dt = row[1]

    if isinstance(dt[5], str):
        pos = str(dt[0])
        name = str(dt[1])
        birtday = dt[2]
        workphone = str(dt[3])
        cabinet = str(dt[4])
        email = str(dt[5])

        cur.execute("insert into users (position, name, birthday, work_phone, cabinet, email, password, department_id) values (%s,%s,%s,%s,%s, %s, %s, %s)", [pos, name, birtday, workphone, cabinet, email, 'test', dep_id])
    else:
        name: str = dt[0]
        if name == 'Итого':
            continue
        description = "Описание для " + name
        pos, rname = name.split(' ', 1)
        pos = pos.strip('. ')
        parent = pos.rsplit('.', 1)[0]
        cur.execute(f"select id from departments where name like '{parent}%' limit 1")
        parent_id = cur.fetchone()
        print(parent_id)
        cur.execute("insert into departments (name, parent_id, description) values (%s,%s,%s) returning id", [name, parent_id, description])
        dep_id = cur.fetchone()
        pass


con.commit()
