import pandas as pd
from flask import Flask, render_template, request
from flask_restful import Resource, Api, abort

DATA_FOLDER = 'data'  # 送電線情報や潮流情報が格納されているフォルダへのパス

# 送電線情報の読み込み
df_line = pd.read_csv(DATA_FOLDER + '/csv_akiyouryou_kikan_soudensen.csv')

class Line(Resource):
    def get(self):
        """
        指定したlabelをもつ送電線の情報を取得するAPI. labelに何も指定しない場合、すべての送電線情報を取得する
        """

        label = request.args.get('label')

        # すべての送電線を返す
        if label == None:
            df_res = df_line.dropna(subset=['label'])  # labelがNaNである列は除外
            return [{
                'label': df_res.iloc[i]['label'],
                'name': df_res.iloc[i]['name'],
                'from': df_res.iloc[i]['from'],
                'to': df_res.iloc[i]['to'],
                'voltage': int(df_res.iloc[i]['電圧(kV)']),
                'capacity': int(df_res.iloc[i]['運用容量値(MW)'])
            } for i in range(len(df_res.index))]

        # 指定されたlabelの送電線を返す
        else:
            df_res = df_line.query('label==@label')  # DataFrameから、labelが一致する行を抜き出す
            if len(df_res.index) > 0:
                return {
                    'label': label, 
                    'name': df_res.iloc[0]['name'],
                    'from': df_res.iloc[0]['from'],
                    'to': df_res.iloc[0]['to'],
                    'voltage': int(df_res.iloc[0]['電圧(kV)']),
                    'capacity': int(df_res.iloc[0]['運用容量値(MW)'])
                }
            else:
                return abort(404)  # 指定されたlabelの送電線データがないとき、404
        

app = Flask(__name__)
api = Api(app)
api.add_resource(Line, '/line')

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, port=5000)