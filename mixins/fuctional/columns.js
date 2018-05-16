export default {
  data() {
    return {
      colsOrderList: [
        {
          title: '名稱',
          key: 'title',
          width: '200px',
          ellipsis: false
        },
        {
          title: '價格',
          key: 'price'
        },
        {
          title: 'Action',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.goBuyProduct(params)
                    }
                  }
                },
                '購買'
              )
            ])
          }
        }
      ],
      colsProdutList: [
        {
          title: '封面',
          key: 'image',
          width: '120px',
          type: 'html'
        },
        {
          title: '名稱',
          key: 'title',
          width: '200px',
          ellipsis: false
        },
        {
          title: '價格',
          key: 'price'
        },
        {
          title: 'Action',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.onPack(params)
                    }
                  }
                },
                'Pack'
              )
            ])
          }
        }
      ]
    }
  }
}
