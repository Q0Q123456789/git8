
# import requests
# print("Hello, Python!")

# a, b = 0, 1
# while b < 10:
#     print(b)
#     a, b = b, b+a


import math
import time
'''
第一行

'''
# a = 10
# b = 20
# c = 21
# d = 0

# d = a + b - c
# print('值：', d)

# d = a**b
# print('值：', d)

# d += a
# print('值：', d)

# if __name__ == '__main__':
#     target = 'https://unsplash.com/'
#     req = requests.get(url=target)
#     print(req.text)


def init(value):

    a = value

    print(a)


init(1)

for item in 'hello':
    if item == 'l':
        break
    print('当前:', item)


for letter in 'Python':     # 第一个实例
    if letter == 'h':
        continue
    print('当前字母 :', letter)

var = 10                    # 第二个实例
while var > 0:
    var = var - 1
    if var == 5:
        continue
    print('当前变量值 :', var)
print("Good bye!")

dict = {'Name': 'Zara', 'Age': 7, 'Class': 'First'}

del dict['Name']  # 删除键是'Name'的条目
dict.clear()     # 清空词典所有条目
# del dict        # 删除词典

print(dict)
ticks = time.time()
print("当前时间戳为:", ticks)
localtime = time.localtime(time.time())
print("本地时间为 :", localtime
      )
# 格式化成2016-03-20 11:45:39形式
print(time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()))

# 格式化成Sat Mar 28 22:24:24 2016形式
print(time.strftime("%a %b %d %H:%M:%S %Y", time.localtime()))

# 将格式字符串转换为时间戳
a = "Sat Mar 28 22:24:24 2016"
print(time.mktime(time.strptime(a, "%a %b %d %H:%M:%S %Y")))


content = dir(math)

print(content)

# str = raw_input("请输入：")
# print("你输入的内容是: ", str)


class Employee:
    '所有员工的基类'
    empCount = 0

    def __init__(self, name, salary):
        self.name = name
        self.salary = salary
        Employee.empCount += 1

    def displayCount(self):
        print("Total Employee %d" % Employee.empCount)

    def displayEmployee(self):
        print("Name : ", self.name,  ", Salary: ", self.salary)


print(Employee.__doc__)
print(Employee.__name__)
print(Employee.__module__)
print(Employee.__bases__)
print(Employee.__dict__)
