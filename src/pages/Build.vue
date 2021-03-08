<template>
  <q-page class="q-px-lg">
    <div class="flex column">
      <h5 class="q-my-sm">New Build 1</h5>
      <span class="text-grey-6">created 1 day ago</span>
    </div>

    <q-separator class="q-my-lg" />

    <div class="flex row">
      <div class="flex column">
        <q-list separator>
          <q-expansion-item v-for="(part, i) in parts" :key="i">
            <template v-slot:header>
              <div class="column">
                <div class="row q-gutter-x-sm">
                  <template v-for="category in part.breadcrumbs">
                    <span :key="category" v-html="category"></span>
                    <span>&raquo;</span>
                  </template>
                </div>
                <div class="text-h6" v-html="part.product.raw.label"></div>
              </div>
            </template>

            <q-card>
              <q-card-section horizontal class="justify-end">
                <q-btn class="block" flat label="Remove" icon="remove" color="red" dense/>
              </q-card-section>

              <q-markup-table flat dense bordered>
                <tbody>
                  <tr v-for="propKey in Object.keys(part.product.raw.properties)" :key="propKey">
                    <td v-html="propKey" class="text-right"></td>
                    <td v-html="part.product.raw.properties[propKey]"></td>
                  </tr>
                </tbody>
              </q-markup-table>
            </q-card>
          </q-expansion-item>

          <q-item>
            <q-item-section>
              <q-btn class="block" flat label="Add" icon="add" color="green" dense @click="openAddPartDialog"/>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>

    <q-dialog v-model="dialog.show" persistent>
        <q-card style="min-width: 450px;">
          <q-form @submit="submitAddPart">
            <q-card-section class="row items-center q-pb-none">
              <div class="text-h6">Add new part</div>
              <q-space/>
              <q-btn icon="close" flat round dense v-close-popup/>
            </q-card-section>

            <q-card-section>
              <q-input v-model="dialog.url"
                       label="Geizhals URL"
                       :rules="[ val => val && val.length > 0 || 'This value is required' ]"
                       :lazy-rules="true"
                       dense
                       autofocus
              />
            </q-card-section>

            <q-card-actions align="right">
              <q-btn label="Add" type="submit" color="primary"/>
            </q-card-actions>

            <q-inner-loading :showing="dialog.loading">
              <q-spinner-tail color="primary" size="lg" />
            </q-inner-loading>
          </q-form>
        </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import {crawl} from "src/services/geizhals-crawler";

export default {
  name: 'Build',

  data() {
    return {
      parts: [
        {
          "breadcrumbs": ["Geizhals.de", "Hardware", "Geh\u0026auml;use", "PC-Geh\u0026auml;use"],
          "product": {
            "raw": {
              "label": " be quiet! Dark Base 700 schwarz, Glasfenster, schallged\u0026auml;mmt (BGW23) ",
              "properties": {
                "Extern": " N\/\u0026#8203;A ",
                "Intern": " 7x 2.5\u0022\/3.5\u0022 (quer, Laufwerksschienen), 3x 3.5\u0022 oder 9x 2.5\u0022 (PSU-Cover), 1x 2.5\u0022 ",
                "Front I\/O": " 1x USB-C 3.1 (20-Pin Key-A Header), 2x USB-A 3.0, 1x Kopfh\u0026ouml;rer, 1x Mikrofon ",
                "PCI-Steckpl\u0026auml;tze": " 9 (2x Riser Card) ",
                "L\u0026uuml;fter (vorne)": " 1x 140mm, 1600rpm oder 3x 140mm (optional) ",
                "L\u0026uuml;fter (hinten)": " 1x 140mm, 1600rpm ",
                "L\u0026uuml;fter (links)": " N\/\u0026#8203;A ",
                "L\u0026uuml;fter (rechts)": " N\/\u0026#8203;A ",
                "L\u0026uuml;fter (oben)": " 3x 140mm (optional) ",
                "L\u0026uuml;fter (unten)": " 1x 140mm (optional) ",
                "L\u0026uuml;fter (sonstige)": " 1x 140mm (optional) ",
                "Radiatorgr\u0026ouml;\u0026szlig;en": " 120\/\u0026#8203;140\/\u0026#8203;240\/\u0026#8203;280\/\u0026#8203;360mm vorne, 120\/\u0026#8203;240\/\u0026#8203;360mm oben, 120\/\u0026#8203;140mm hinten "
              }
            }
          }
        }
      ],
      dialog: {
        show: false,
        loading: false,
        url: ''
      }
    }
  },

  methods: {
    openAddPartDialog() {
      this.dialog.url = '';
      this.dialog.show = true;
    },

    async submitAddPart() {
      this.dialog.loading = true;

      try {
        let part = await crawl(this.dialog.url);

        this.parts.push(part);

        this.dialog.show = false;
      } catch (e) {
        console.error(e);
      } finally {
        this.dialog.loading = false;
      }
    }
  }
}
</script>
