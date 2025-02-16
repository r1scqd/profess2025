from PySide6 import QtWebEngineWidgets
from PySide6.QtWidgets import QApplication, QMainWindow
from PySide6.QtGui import QIcon


class DesktopApp(QMainWindow):
    def __init__(self, /):
        super().__init__()
        self.setMinimumSize(800, 600)
        we = QtWebEngineWidgets.QWebEngineView()
        we.setUrl("http://localhost:5174")
        self.setCentralWidget(we)
        self.setWindowTitle("Организационная структура")
        self.setWindowIcon(QIcon("src/assets/Logo.png"))


if __name__ == '__main__':
    app = QApplication()

    da = DesktopApp()
    da.show()

    app.exec()
